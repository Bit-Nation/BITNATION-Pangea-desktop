// @flow

import { schemata as schemaVSix, migration as migrationVSix } from './schema/v6';

/**
 * @desc All available schemas. including there version and migration.
 */
export default [
    {
        schema: schemaVSix,
        schemaVersion: 6,
        migration: migrationVSix,
    },
];

export {
    DHTValueSchema,
    DHTValueType,
    AccountSchema,
    AccountType,
    AccountSettingsSchema,
    AccountSettingsType,
    MessageJobSchema,
    MessageJobType,
    NationSchema,
    NationType,
    TransactionJobSchema,
    TransactionJobType,
    ProfileSchema,
    ProfileType,
    WalletSchema,
    WalletType,
} from './schema/v6';
