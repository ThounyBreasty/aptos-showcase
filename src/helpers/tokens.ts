import axios from "axios";

const query = `
    query CurrentTokens($owner_address: String, $offset: Int) {
        current_token_ownerships(
            where: {owner_address: {_eq: $owner_address}, amount: {_gt: "0"}, table_type: {_eq: "0x3::token::TokenStore"}}
            order_by: {last_transaction_version: desc}
            offset: $offset
        ) {
            name
            current_token_data {
                metadata_uri
            }
        }
    }
`;

interface IToken {
    current_token_data: {
        metadata_uri: string,
    },
    name: string,
}

interface IUrl {
    data: {
        image: string,
    },
}

const getTokensForAddress = async (address: string): Promise<IToken[] | null> => {
    const result = await fetch(
        "https://indexer.mainnet.aptoslabs.com/v1/graphql",
        {
            method: "POST",
            body: JSON.stringify({
                query,
                variables: { "owner_address": address, "offset": 0 },
                operationName: "CurrentTokens",
            })
        }
    );
    const { errors, data } = await result.json();

    if (errors) {
        console.error(errors);
        return null;
    }
    return data.current_token_ownerships;
};


const getUrisForTokens = async (adress: string): Promise<string[][] | null> => {
    const tokens: IToken[] | null = await getTokensForAddress(adress);
    if (tokens === null) {
        return null;
    }
    
    const uris = tokens.map((token) => {
        return [token.current_token_data.metadata_uri, token.name];
    });
    
    return uris;
};


const parseUri = (uri: string): string => {
    if (uri.startsWith("http")) {
        return uri;
    } else if (uri.startsWith("ipfs")) {
        const slice = uri.slice(7);
        return "https://ipfs.io/ipfs/".concat(slice);
    } else {
        return "";
    }
};


export const getImagesForUris = async (address: string): Promise<string[][] | null> => {
    const uris: string[][] | null = await getUrisForTokens(address);
    if (uris === null) {
        return null;
    }

    const images: Promise<string[][]> = Promise.all(uris.map(async(uri) => {
        const url = parseUri(uri[0]);
        
        if (!url.startsWith("http")) {
            return ["", uri[1]];
        } else if (url.endsWith("png" || "jpg" || "jpeg" || "gif")) {
            return [url, uri[1]];
        } else {        
            const result: IUrl = await axios.get(url);
            return [result.data.image, uri[1]];
        }
        
    }));
    
    return images;
};