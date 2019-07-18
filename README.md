# Airdrop-File-Gen
A script to generate Airdrop file according to the Staked/Delegations of an other Tokens/Tribes.

It can be used with multiple options and limits. it generate a file for airdrop, that file can be executed with airdrop-tool Script.

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
}
```

## Finalizing
Now install Dependencies and Run it
```javascript
$ npm install
$ node airdrop.js
```
It will generate a airdrop-File according to the configurations in the `files` Folder every time you run it.
***

## Development
Encounter any issue or Bugs, Please report them [Here](https://github.com/alihassanah/airdrop-tool/issues).

Bot Developed by @ali=h on steemit, `A-jaX#9816` on Discord.
