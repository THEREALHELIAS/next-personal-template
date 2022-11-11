import client from 'apollo-client';


async function getGameInfoById(item){
  // let game_id = item[0];
  // let end_time = item[1].end_time;s
  // let whitelist = item[1].whitelist;
  // console.log(game_id);
  // console.log(end_time);
  // console.table(whitelist);
  const returningData = {
    game_id: item[0],
    start_time: item[1].start_time,
    end_time: item[1].end_time,
    whitelist: item[1].whitelist,
    usage_cost: item[1].usage_cost,
    positions: item[1].positions,
    lineup_len: item[1].lineup_len,
    joined_player_counter: item[1].joined_player_counter,
    jointed_team_counter: item[1].joined_team_counter,
    isCompleted: Date.now() >= item[1].end_time ? true : false,
    status: Date.now() >= item[1].end_time ? 'completed' :
            Date.now() < item[1].start_time ? 'upcoming' :
            Date.now() > item[1].start_time && Date.now() < item[1].end_time ? 'ongoing' : 'invalid'
  }


  return returningData;
}

export { getGameInfoById};