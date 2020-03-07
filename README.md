# SCPI 2.1.1 bridge

Talk to the SCN with an SCPI 2.1.1 backend

## Modules

Only the following Charging Point interfaces are currently implemented:

- Credentials
- Locations (PULL from CPO)
- Tariffs (PULL from CPO)
- Commands (request start and stop of charging session incl. async result)
- Sessions (PULL from CPO)
- Cdrs (PULL from CPO)

## Setup

Copy the example config file, editing necessary values:
```
cp src/config/config..ts src/config/config.ts
```

There are two config objects inside the config file, one for the SCN and one for the SCPI 2.1.1 backend.

# Connect to backend

Once configuration is pointing to the correct backend (assuming TOKEN_A has already been obtained), 
we can do the credentials handshake with it. 

```
node scripts/register.js
```

# Connect to the Smart Charging Network

The SCN connection requires a TOKEN_A from the Smart Charging Network (SCN) node being connected to, as well as a
 registry entry
pointing the Bridge's party credentials to the Smart Charging Network Node. To do the latter, all that is needed is a 
private key with funds to pay for a transaction on the network of choice (defined in the Smart Charging Network config).

Assuming the SCN config value `dryRun` is set to `false`, the following will attempt to create the connection
between bridge and SCN.

```
TOKEN_A=abc-123 SIGNER_KEY=0x123...456 npm start
```

If successful stdout will show two requests made to the versions endpoint of the bridge. On subsequent restarts
the two environment variables will no longer be needed.

