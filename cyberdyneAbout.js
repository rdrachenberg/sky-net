
class About {
    constructor(nodeId, chainId, nodeUrl, peers = 2, currentDifficulty, confirmedTransactions, pendingTransactions) {
        this.about = 'cyberdyne.systems.skynet'
        this.nodeId = nodeId;
        this.chainId = chainId;
        this.nodeUrl= nodeUrl;
        this.peers = peers;
        this.currentDifficulty = currentDifficulty;
        this.confirmedTransactions = confirmedTransactions;
        this.pendingTransactions = [];
    }
}

module.exports = About