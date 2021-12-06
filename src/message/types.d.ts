export declare type BaseContent = {
    address: string;
    time: number;
};
export declare type MongoDBID = {
    $oid: string;
};
export declare type MessageConfirmationHash = {
    binary: string;
    type: string;
};
export declare type MessageConfirmation = {
    chain: string;
    height: number;
    hash: string | MessageConfirmationHash;
};
export declare enum StorageEngine {
    IPFS = "IPFS",
    STORAGE = "STORAGE",
    INLINE = "INLINE"
}
export declare type BaseMessage = {
    _id?: MongoDBID;
    chain: string;
    sender: string;
    type: string;
    channel?: string;
    confirmations?: MessageConfirmation[];
    confirmed?: boolean;
    signature?: string;
    size?: number;
    time: number;
    item_type?: StorageEngine;
    item_content?: string;
    hash_type?: string;
    item_hash?: string;
    content?: BaseContent;
};
export declare type MessageResponse<T> = {
    messages: PostMessage<T>[] | AggregateMessage<T>[] | StoreMessage[];
    pagination_page: number;
    pagination_total: number;
    pagination_per_page: number;
    pagination_item: string;
};
export declare type AggregateMessageResponse = {
    _id: {
        $oid: string;
    };
    chain: string;
    item_hash: string;
    sender: string;
    type: string;
    channel: string;
    confirmed: boolean;
    content: {
        address: string;
        key: string;
        content: any;
        time: number;
    };
    item_content: string;
    item_type: string;
    signature: string;
    size: number;
    time: number;
};
declare type AggregateContentKey = {
    name: string;
};
export declare type AggregateContent<T> = {
    address: string;
    key: string | AggregateContentKey;
    content?: T;
    time: number;
};
export declare type AggregateMessage<T> = BaseMessage & {
    type: string;
    content: AggregateContent<T>;
};
export declare type PostMessageResponse = {
    _id: {
        $oid: string;
    };
    chain: string;
    item_hash: string;
    sender: string;
    type: string;
    channel: string;
    confirmed: boolean;
    content: {
        type: string;
        address: string;
        content: {
            incentive: string;
            status: string;
            start_height: number;
            end_height: number;
            rewards: any[];
            tags: string[];
        };
        time: number;
    };
    item_content: string;
    item_type: string;
    signature: string;
    size: number;
    time: number;
};
export declare type ChainRef = {
    chain: string;
    channel?: string;
    item_content: string;
    item_hash: string;
    item_type: string;
    sender: string;
    signature: string;
    time: number;
    type: string;
};
export declare type PostContent<T> = BaseContent & {
    content?: T;
    type: string;
    ref?: string | ChainRef;
};
export declare type PostMessage<T> = BaseMessage & {
    type: string;
    content: PostContent<T>;
};
export declare type PostQueryConfiguration = {
    api_server?: string;
    pagination?: number;
    page?: number;
    refs?: string[];
    addresses?: string[];
    tags?: string[];
    hashes?: string[];
};
export declare type StoreMessageResponse = {
    _id: {
        $oid: string;
    };
    chain: string;
    item_hash: string;
    sender: string;
    type: string;
    channel: string;
    confirmations: {
        chain: string;
        height: number;
        hash: string;
    }[];
    confirmed: boolean;
    content: {
        address: string;
        item_type: string;
        item_hash: string;
        time: number;
        ref: string;
        source_chain: string;
        source_contract: string;
        tx_hash: string;
        height: number;
        submitter: string;
        size: number;
        content_type: string;
    };
    item_content: string;
    item_type: string;
    signature: string;
    size: number;
    time: number;
};
export declare type StoreContent = BaseContent & {
    item_type: string;
    item_hash?: string;
    size?: number;
    content_type?: string;
    ref?: string;
};
export declare type StoreMessage = BaseMessage & {
    type: string;
    content: StoreContent;
};
export {};
