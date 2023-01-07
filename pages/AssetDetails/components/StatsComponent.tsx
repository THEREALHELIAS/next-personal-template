import React, { useEffect, useState, useCallback } from 'react';
import {
  GET_ATHLETEDATA_QB,
  GET_ATHLETEDATA_RB,
  GET_ATHLETEDATA_WR,
  GET_ATHLETEDATA_TE,
  GET_ATHLETEDATA_NBA,
} from 'utils/queries';
import { useLazyQuery } from '@apollo/client';
import { qbStatNames, rbStatNames, wrStatNames, teStatNames, nbaStatNames } from 'data/constants/statNames';
import { getSportType } from 'data/constants/sportConstants';
const StatsComponent = (props) => {
  const { id, position, sport } = props;
  const [statNames, setStatNames] = useState([]);
  const [getAthleteQB] = useLazyQuery(GET_ATHLETEDATA_QB);
  const [getAthleteRB] = useLazyQuery(GET_ATHLETEDATA_RB);
  const [getAthleteWR] = useLazyQuery(GET_ATHLETEDATA_WR);
  const [getAthleteTE] = useLazyQuery(GET_ATHLETEDATA_TE);
  const [getAthleteNBA] = useLazyQuery(GET_ATHLETEDATA_NBA);
  const [athleteData, setAthleteData] = useState([]);
  const [positionDisplay, setPositionDisplay] = useState('');

  function getAverage(position, athleteData) {
    let newState = athleteData;
    console.log(newState);
    let avg;
    switch (position) {
      case 'RB':
        console.log('test');
        avg = Math.round((newState[3] / newState[2]) * 10 + Number.EPSILON) / 10;
        // newState.push(Number.isNaN(avg) ? 0 : avg);
        newState.splice(4, 0, Number.isNaN(avg) ? 0 : avg);
        break;
      case 'WR':
      case 'TE':
        avg = Math.round((newState[4] / newState[3]) * 10 + Number.EPSILON) / 10;
        // newState.push(Number.isNaN(avg) ? 0 : avg);
        newState.splice(4, 0, Number.isNaN(avg) ? 0 : avg);
        break;
      // default:
      //   // nba shit??
      //   break;
    }
    return newState;
  }

  const query_stats = useCallback(async (position, id) => {
    let query;
    let state;
    switch (position) {
      case 'QB':
        query = await getAthleteQB({ variables: { getAthleteById: parseFloat(id.toString()) } });
        setStatNames(qbStatNames);
        console.log(query.data.getAthleteById);
        setAthleteData(
          await Promise.all(
            Object.values(query.data.getAthleteById.stats.find((x) => x.type === 'season'))
          )
        );
        break;
      case 'RB':
        query = await getAthleteRB({ variables: { getAthleteById: parseFloat(id.toString()) } });
        state = getAverage(
          position,
          Object.values(query.data.getAthleteById.stats.find((x) => x.type === 'season'))
        );
        setAthleteData(state);
        setStatNames(rbStatNames);
        break;
      case 'WR':
        query = await getAthleteWR({ variables: { getAthleteById: parseFloat(id.toString()) } });
        state = getAverage(
          position,
          Object.values(query.data.getAthleteById.stats.find((x) => x.type === 'season'))
        );
        setAthleteData(state);
        setStatNames(wrStatNames);
        break;
      case 'TE':
        query = await getAthleteTE({ variables: { getAthleteById: parseFloat(id.toString()) } });
        state = getAverage(
          position,
          Object.values(query.data.getAthleteById.stats.find((x) => x.type === 'season'))
        );
        setAthleteData(state);
        setStatNames(teStatNames);
        break;
      default:
        query = await getAthleteNBA({ variables: { getAthleteById: parseFloat(id.toString()) } });
        state = getAverage(
          position,
          Object.values(query.data.getAthleteById.stats.find((x) => x.type === 'season'))
          // Object.values(query.data.getAthleteById.stats[0])
        )
        setAthleteData(state);
        setStatNames(nbaStatNames);
        break;
    }
  }, []);

  useEffect(() => {
    if (id !== undefined && position !== undefined) {
      query_stats(position, id).catch(console.error);
      setPositionDisplay(getSportType(sport).positionList.find((x) => x.key === position).name);
    }
  }, [id, position, query_stats]);

  useEffect(() => {}, []);
  return (
    <>
      <div
        className="flex h-1/8 w-1/3 ml-24 -mt-16 justify-center content-center select-none text-center text-4xl 
            bg-indigo-black font-monument text-indigo-white p-2 pl-5"
      >
        <div className="">{positionDisplay}</div>
      </div>

      <div className="mt-14 ml-24 w-1/2 text-sm grid grid-rows-4 grid-cols-4">
        <div>
          <div className="font-monument text-5xl -mb-6">{athleteData[2]?.toFixed(2)}</div>
          <br></br>
          <div className="">{statNames[1]}</div>
        </div>
        <div>
          <div className="font-monument text-5xl -mb-6">{athleteData[3]?.toFixed(2)}</div>
          <br></br>
          {statNames[2]}
        </div>
        <div>
          <div className="font-monument text-5xl -mb-6">{athleteData[4]?.toFixed(2)}</div>
          <br></br>
          {statNames[3]}
        </div>
        <div>
          <div className="font-monument text-5xl -mb-6">{athleteData[5]?.toFixed(2)}</div>
          <br></br>
          {statNames[4]}
        </div>
        <div>
          <div className="font-monument text-5xl -mb-6 mt-2">{athleteData[6]?.toFixed(2)}</div>
          <br></br>
          {statNames[5]}
        </div>
        <div>
          <div className="font-monument text-5xl -mb-6 mt-2">{athleteData[7]?.toFixed(2)}</div>
          <br></br>
          {statNames[6]}
        </div>
        <div>
          <div className="font-monument text-5xl -mb-6 mt-2">{athleteData[8]?.toFixed(2)}</div>
          <br></br>
          {statNames[7]}
        </div>
        <div>
          <div className="font-monument text-5xl -mb-6 mt-2">{athleteData[9]?.toFixed(2)}</div>
          <br></br>
          {statNames[8]}
        </div>
      </div>
    </>
  );
};

export default StatsComponent;
