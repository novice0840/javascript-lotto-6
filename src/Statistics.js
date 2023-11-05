import { Console } from '@woowacourse/mission-utils';
import { LOTTO_MESSAGE, PRIZE_MONEY } from './constant.js';

class Statistics {
  #first;

  #second;

  #third;

  #fourth;

  #fifth;

  #earningRate;

  constructor(winningNumber, bonusNumber, lottos) {
    this.#first = 0;
    this.#second = 0;
    this.#third = 0;
    this.#fourth = 0;
    this.#fifth = 0;
    this.#earningRate = 0;
    this.#calculateStatistics(winningNumber, bonusNumber, lottos);
    this.#calculateEarningRate(lottos.length);
  }

  #calculateEarningRate(numberOfLotto) {
    this.#earningRate = (
      ((this.#first * PRIZE_MONEY.FIRST +
        this.#second * PRIZE_MONEY.SECOND +
        this.#third * PRIZE_MONEY.THIRD +
        this.#fourth * PRIZE_MONEY.FOURTH +
        this.#fifth * PRIZE_MONEY.FIFTH) /
        (numberOfLotto * 1000)) *
      100
    ).toFixed(1);
  }

  #calculateStatistics(winningNumber, bonusNumber, lottos) {
    lottos.forEach((lotto) => {
      const score = lotto.filter((number) => winningNumber.includes(number)).length;
      if (score === 6) this.#first += 1;
      else if (score === 5 && lotto.includes(bonusNumber)) this.#second += 1;
      else if (score === 5) this.#third += 1;
      else if (score === 4) this.#fourth += 1;
      else if (score === 3) this.#fifth += 1;
    });
  }

  printStatistics() {
    Console.print(LOTTO_MESSAGE.WINNING_STATISTICS);
    Console.print(`3개 일치 (5,000원) - ${this.#fifth}개`);
    Console.print(`4개 일치 (50,000원) - ${this.#fourth}개`);
    Console.print(`5개 일치 (1,500,000원) - ${this.#third}개`);
    Console.print(`5개 일치, 보너스 볼 일치 (30,000,000원) - ${this.#second}개`);
    Console.print(`6개 일치 (2,000,000,000원) - ${this.#first}개`);
    Console.print(`총 수익률은 ${this.#earningRate}%입니다.`);
  }
}

export default Statistics;
