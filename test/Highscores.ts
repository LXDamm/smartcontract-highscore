import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Highscores", function () {
  async function deploy() {
    const highscores = await ethers.deployContract('Highscores');
    return { highscores };
  }

  it("Should deploy to correct address", async function() {
    const { highscores } = await loadFixture(deploy);

    expect((await highscores.getAddress()).toLowerCase()).to.equal('0x5fbdb2315678afecb367f032d93f642f64180aa3');
  });

  it("Should return Silkworm as gameName", async function() {
    const { highscores } = await loadFixture(deploy);

    expect((await highscores.gameName())).to.equal('Silkworm');
  });

  it("Should throw a error on a score of zero", async function() {
    const { highscores } = await loadFixture(deploy);

    await expect(highscores.enterScore(0, 'LX')).to.be.rejectedWith(Error);
  });


  it("Should throw a error when the highscore is full", async function() {
    const { highscores } = await loadFixture(deploy);

    for (let i = 0; i < 10; i++) {
      await highscores.enterScore(500, 'Foo');
    }

    await expect(highscores.enterScore(1000, 'LX')).to.be.rejectedWith(Error);
  });

  it("Should return HIPkid as the player with lowest score and lonlyGamer with the highest score", async function() {
    const { highscores } = await loadFixture(deploy);

    await highscores.enterScore(500, 'Foo');
    await highscores.enterScore(1234, 'Boomer');
    await highscores.enterScore(700, 'Sato');
    await highscores.enterScore(5, 'HIPkid');
    await highscores.enterScore(2000, 'DarkLordz');

    await highscores.enterScore(3000, 'K');
    await highscores.enterScore(5000, 'V');
    await highscores.enterScore(128000, 'Turing');
    await highscores.enterScore(125, 'Punk');
    await highscores.enterScore(175000, 'lonlyGamer');

    const loser = (await highscores.entries(9)).name;
    const winner = (await highscores.entries(0)).name;
    expect(loser).to.be.equal('HIPkid');
    expect(winner).to.be.equal('lonlyGamer');
  });
});
