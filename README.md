# OCPI 2.1.1 bridge

Talk to the OCN with an OCPI 2.1.1 backend

## Modules

- Credentials
- Locations: request locations via backend over OCN
- Commands: request start and stop of charging session incl. async result

## Setup

Copy the example config file, editing necessary values:
```
cp src/config/config.example.ts src/config/config.ts
```

There are two config objects inside the config file, one for the OCN and one for the OCPI 2.1.1 backend.

# Connect to backend

Once configuration is pointing to the correct backend (assuming TOKEN_A has already been obtained), 
we can do the credentials handshake with it. 

```
node scripts/register.js
```

# Connect to the OCN

The OCN connection requires a TOKEN_A from the OCN client being connected to, as well as a registry entry
pointing the Bridge's party credentials to the OCN Client. To do the latter, all that is needed is a 
private key with funds to pay for a transaction on the network of choice (defined in the OCN config).

Assuming the OCN config value `dryRun` is set to `false`, the following will attempt to create the connection
between bridge and OCN.

```
TOKEN_A=abc-123 SIGNER_KEY=0x123...456 npm start
```

If successful stdout will show two requests made to the versions endpoint of the bridge. On subsequent restarts
the two environment variables will no longer be needed.

