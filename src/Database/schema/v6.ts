import * as Realm from 'realm';

export const AccountSchema = {
    name: 'Account',
    primaryKey: 'id',
    properties: {
        id: 'string',
        name: 'string',
        location: 'string',
        description: 'string',
        profileImage: 'string',
        accountStore: 'string',
        confirmedMnemonic: 'bool',
        networkType: 'string',
        lastMigrationVersion: 'string',
        DHT: {
            type: 'list',
            objectType: 'DHTValue',
        },
    },
};

export type AccountType = {
    /** in the uuid4 format */
    id: string
    name: string
    location: string
    /** A profile description */
    description: string
    /** This should be a multihash (https://github.com/multiformats/multihash). It will be a reference to the image stored in the DHT. */
    profileImage: string
    /** This string is the encrypted keystore that contains all the private key's etc needed to work with this account */
    accountStore: string
    confirmedMnemonic: boolean
    /** This is the last migration version of the app */
    lastMigrationVersion: string
    networkType: 'main' | 'dev'
    /** DHT is the decentralized hash table of the account. It hold's data available to the public network. Like the profile image etc. */
    DHT: DHTValueType[]
};

export const AccountSettingsSchema = {
    name: 'AccountSettings',
    primaryKey: 'id',
    properties: {
        id: 'string',
        passcodeType: 'string',
        pinCodeLength: {
            type: 'int',
            optional: true,
        },
    },
};

export type AccountSettingsType = {
    /** Id of account that settings are related to. */
    id: string

    /** Selected type of passcode. */
    passcodeType: 'pinCode' | 'password'

    /** Selected type of network - either dev or main. */
    pinCodeLength: number | null
};

export type DHTValueType = {
    /** the multihash (https://github.com/multiformats/multihash) key of the value */
    key: string

    value: ArrayBuffer

    /** The expiration date/time of the record */
    ttl: Date
};

export const DHTValueSchema = {
    name: 'DHTValue',
    properties: {
        key: {
            type: 'string',
            unique: true,
        },
        value: 'data',
        ttl: 'date',
    },
};

export type MessageJobType = {
    id: number
    accountId: string
    heading: string
    params: string
    msg: string
    version: number
    display: boolean
    interpret: boolean
    createdAt: Date
};

export const MessageJobSchema = {
    name: 'MessageJob',
    primaryKey: 'id',
    properties: {
        id: 'int',
        accountId: 'string',
        heading: {
            type: 'string',
            optional: true,
        },
        interpret: 'bool',
        params: 'string',
        display: 'bool',
        msg: 'string',
        version: 'int',
        createdAt: 'date',
    },
};

export type TransactionJobType = {
    txHash: string
    status: number

    /** Can be something like NATION_JOIN, NATION_LEAVE, NATION_CREATE etc. Used to know what this transaction is about. */
    type: string
    nation: NationType[] // It's an array since reversed relations are always arrays in Realm.

    /** Id of account that tx is related to */
    accountId: string
};

export const TransactionJobSchema = {
    name: 'TransactionJob',
    primaryKey: 'txHash',
    properties: {
        txHash: 'string',
        status: 'int',
        type: 'string',
        nation: {
            type: 'linkingObjects',
            objectType: 'Nation',
            property: 'tx',
        },
        accountId: 'string',
    },
};

export type NationType = {
    /** internal id of the dataset */
    id: string

    /** Id of account that nation is related to. */
    accountId: string

    /** the id in the nation smart contract. If not this will be -1. */
    idInSmartContract: number

    /** mean's if it is written to the blockchain (@todo this is probably an redundant field since you can get this information from "idInSmartContract") */
    created: boolean

    /** human readable name of the nation */
    nationName: string

    /** human readable description of the nation */
    nationDescription: string

    /** Does the nation already exists? */
    exists: boolean

    /** Is it a virtual nation? */
    virtualNation: boolean

    /** The nation code of law. */
    nationCode: string
    lawEnforcementMechanism: string

    /** Is this nation a for profit use? */
    profit: boolean

    /** Can non citizens use the services? */
    nonCitizenUse: boolean
    diplomaticRecognition: boolean
    decisionMakingProcess: string
    governanceService: string

    /** Number of citizens */
    citizens: number

    /** Did I join the nation? */
    joined: boolean

    /** A transaction. It can be e.g. a transaction that is responsible for writing the nation to the blockchain. */
    tx: TransactionJobType | null
};

export const NationSchema = {
    name: 'Nation',
    primaryKey: 'id',
    properties: {
        accountId: 'string',
        id: 'string',
        idInSmartContract: {
            default: -1,
            type: 'int',
        },
        tx: {
            type: 'TransactionJob',
            optional: true,
        },
        created: 'bool',
        nationName: 'string',
        nationDescription: 'string',
        exists: 'bool',
        virtualNation: 'bool',
        nationCode: 'string',
        lawEnforcementMechanism: 'string',
        profit: 'bool',
        nonCitizenUse: 'bool',
        diplomaticRecognition: 'bool',
        decisionMakingProcess: 'string',
        governanceService: 'string',
        citizens: {
            type: 'int',
            default: 0,
        },
        joined: {
            type: 'bool',
            default: false,
        },
    },
};

export type ProfileType = {
    name: string
    location: string
    image: string
    identityKey: string
    ethereumPublicKey: string
    ethereumAddress: string
    chatIdKey: string
    timestamp: Date
    version: number
    identityKeySignature: string
    ethereumKeySignature: string
};

export const ProfileSchema = {
    name: 'Profile',
    primaryKey: 'identityKey',
    properties: {
        name: 'string',
        location: 'string',
        image: 'string',
        identityKey: 'string',
        ethereumPublicKey: 'string',
        ethereumAddress: 'string',
        chatIdKey: 'string',
        timestamp: 'date',
        version: 'int',
        identityKeySignature: 'string',
        ethereumKeySignature: 'string',
    },
};

export type WalletType = {
    /** Representation of the currency tokens. */
    symbol: 'ETH' | 'PAT'

    /** Wallet's name. */
    name: string

    /** True if token is based on Ethereum. */
    chain: 'ethereum' | 'rootstock' | 'bitcoin'

    /** Number of decimals for the token. */
    decimals: number

    /** Wallet's balance. */
    balance: string

    /** Wallet's Public address. */
    address: string

    accountId: string
    compoundId: string
};

export const WalletSchema = {
    name: 'Wallet',
    primaryKey: 'compoundId',
    properties: {
        name: 'string',
        symbol: 'string',
        chain: 'string',
        decimals: 'int',
        balance: 'string',
        address: 'string',
        accountId: 'string',
        compoundId: 'string',
    },
};

export const schemata = [
    AccountSchema,
    AccountSettingsSchema,
    DHTValueSchema,
    MessageJobSchema,
    TransactionJobSchema,
    NationSchema,
    ProfileSchema,
    WalletSchema,
];

export const migration = (oldRealm: Realm, newRealm: Realm) => {};
