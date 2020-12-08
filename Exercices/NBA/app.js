const warriorsGames = [
  {
    awayTeam: {
      team: 'Golden State',
      points: 119,
      isWinner: true,
    },
    homeTeam: {
      team: 'Houston',
      points: 106,
      isWinner: false,
    },
  },
  {
    awayTeam: {
      team: 'Golden State',
      points: 105,
      isWinner: false,
    },
    homeTeam: {
      team: 'Houston',
      points: 127,
      isWinner: true,
    },
  },
  {
    homeTeam: {
      team: 'Golden State',
      points: 126,
      isWinner: true,
    },
    awayTeam: {
      team: 'Houston',
      points: 85,
      isWinner: false,
    },
  },
  {
    homeTeam: {
      team: 'Golden State',
      points: 92,
      isWinner: false,
    },
    awayTeam: {
      team: 'Houston',
      points: 95,
      isWinner: true,
    },
  },
  {
    awayTeam: {
      team: 'Golden State',
      points: 94,
      isWinner: false,
    },
    homeTeam: {
      team: 'Houston',
      points: 98,
      isWinner: true,
    },
  },
  {
    homeTeam: {
      team: 'Golden State',
      points: 115,
      isWinner: true,
    },
    awayTeam: {
      team: 'Houston',
      points: 86,
      isWinner: false,
    },
  },
  {
    awayTeam: {
      team: 'Golden State',
      points: 101,
      isWinner: true,
    },
    homeTeam: {
      team: 'Houston',
      points: 92,
      isWinner: false,
    },
  },
];

const getPoints = ({ awayTeam, homeTeam }) => {
  const awayPoint = awayTeam.points;
  const homePoint = homeTeam.points;
  if (awayPoint > homePoint) {
    return `<b>${awayPoint}</b>-${homePoint}</li>`;
  } else {
    return `${awayPoint}-<b>${homePoint}</b></li>`;
  }
};

const getResults = () => {
  const results = document.createElement('ul');

  const getResult = ({ awayTeam, homeTeam }) => {
    const li = document.createElement('li');
    const getTeams = () => {
      return `${awayTeam.team} @ ${homeTeam.team}`;
    };

    const getPoints = () => {
      const awayPoint = awayTeam.points;
      const homePoint = homeTeam.points;

      if (awayPoint > homePoint) {
        return `<b>${awayPoint}</b>-${homePoint}`;
      } else {
        return `${awayPoint}-<b>${homePoint}</b>`;
      }
    };
    li.innerHTML = `${getTeams()} ${getPoints()}`;
    if (
      (awayTeam.team === 'Golden State' && awayTeam.isWinner) ||
      (homeTeam.team === 'Golden State' && homeTeam.isWinner)
    ) {
      li.className = 'winner';
    } else {
      li.className = 'looser';
    }

    return li;
  };
  warriorsGames.forEach(match => {
    results.append(getResult(match));
  });

  return results;
};

document.querySelector('body').append(getResults());
