# Airdrop-File-Gen
A script to generate Airdrop file according to the Stake/Delegations of users from another Token or Tribe. (Hive-Engine)

It can be used with multiple options and limits. it generate a file for airdrop, that file can be executed with airdrop-tool Script.

After generating the file you can use it airdrop tokens with this [script](https://github.com/ali-h/airdrop-tool)
***

## Configuration
To generate Airdrop file it has to be configured first, it is easy and simple:

```javascript
{
    "token" : {
        "symbol" : "" // symbol of the token you want to get users from
    },
    "limits" : {
        "min_stake" : 0, // minimum amount of stake to count the user in
        "max_stake" : 0 // maximum amount of stake to count in
    },
    "enable_above_max_users" : false, // set it true to include the users above max range
                                      // it will not get the reward bigger, reward will be
                                      // calculated with the max_stake
    "reward_pool" : 0 // total reward pool, reward for per user will be calculated with it
}
```

## Finalizing
Now install Dependencies and Run it
```javascript
$ npm install
$ node filegen.js
```
It will generate a airdrop-File according to the configurations in the `files` Folder every time you run it.
***

## Development
Encounter any issue or Bugs, Please report them [Here](https://github.com/ali-h/airdrop-file-gen/issues).

Bot Developed by @ali-h on hive, @Ali H#7057 on Discord.
