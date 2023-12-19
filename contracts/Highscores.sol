// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;


struct Entry {
    uint score;
    string name;
}

contract Highscores {
    string public gameName = "Silkworm";
    uint8 private currenScores = 0;

    Entry[10] public entries;

    function enterScore(
        uint score,
        string calldata name
    ) public payable {
        require(currenScores < 10, 'Highscore is done, not accepting further contributions');
        require(score > 0, 'Not accepting entry for a score of 0 or less');

        entries[currenScores].score = score;
        entries[currenScores].name = name;
        currenScores++;

        bool swapped;
        do {
            swapped = false;
            for (uint8 i = 1; i <= (currenScores - 1); i++) {
                if (entries[i - 1].score < entries[i].score) {
                    uint swappedScore = entries[i - 1].score;
                    string memory swappedName = entries[i - 1].name;
                    entries[i - 1].score = entries[i].score;
                    entries[i - 1].name = entries[i].name;
                    entries[i].score = swappedScore;
                    entries[i].name = swappedName;
                    swapped = true;
                }
            }
        } while (swapped == true);
    }
}
