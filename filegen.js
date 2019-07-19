const config = require('./config.json')
const fs = require("fs")
const axios = require('axios')

function getAllStakers (callback) {
    var stakers = []
    var requestURL = "https://api.steem-engine.com/rpc/contracts"
    var request = {
        id: 1,
        jsonrpc: "2.0",
        method: "find",
        params: {
            contract: "tokens",
            indexes: "",
            offset: 0,
            query: {symbol: config.token.symbol},
            table: "balances"
        }
    }
    axios.post(requestURL, request)
    .then((res) => {
        var balances = res.data.result
        for(var i = 0; i <= balances.length - 1; i++) {
            this_balance = balances[i]
            if (this_balance.stake > 0 || this_balance.delegationsOut > 0) {
                var this_stake
                if (typeof this_balance.delegationsOut == "undefined")
                    this_stake = parseFloat(this_balance.stake)
                else
                    this_stake = parseFloat(this_balance.delegationsOut) + parseFloat(this_balance.stake)

                if (this_stake >= config.limits.min_stake)
                {
                    var push = true
                    var this_user = {
                        "username" : this_balance.account,
                        "stake" : this_stake
                    }
                    if (this_stake >= config.limits.max_stake)
                        if (config.enable_users_above_max == true)
                            this_user.stake = config.limits.max_stake
                        else
                            push = false
                    
                    if (push == true)
                        stakers.push(this_user)
                }
            }
        }
        callback(stakers)
    })
    .catch((error) => {
        console.error(error)
    })
}

function getRewards (stakers) {
    var totalStake = 0
    for (var i = 0; i <= stakers.length -1; i++) {
        totalStake = totalStake + parseFloat(stakers[i].stake)
    }
    var rewards = []
    for (var i = 0; i <= stakers.length -1; i++) {
        var this_staker = stakers[i]
        var pool_share = this_staker.stake / totalStake
        var pool_reward = pool_share * config.reward_pool
        var rewardOBJ = {
            "username" : this_staker.username,
            "reward" : pool_reward
        }
        rewards.push(rewardOBJ)
    }
    return rewards
}

getAllStakers(function(stakers) {
    var rewardList = getRewards(stakers)
    var rewardsTXT = '';
    for (reward_no in rewardList) {
        rewardsTXT = rewardsTXT + rewardList[reward_no].username + ' ' + rewardList[reward_no].reward.toFixed(3) + '\n'
    }
    fs.writeFile('./files/' + config.token.symbol + '-' + Math.floor(1000 + Math.random() * 9000) + '.airdrop', rewardsTXT, function (err) {
        if (err) throw err;
    })
})