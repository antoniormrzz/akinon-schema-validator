import jessy from 'jessy';

let runIsolatedChecksOnEndPoints = (baseObj, directKeys, allKeys, entries) => {
  let schemaMap = new Map();
  let choicesMap = new Map();
  directKeys.forEach(element => {
    if ('schema' in baseObj[element]) {
      schemaMap.set(element + '.schema', true);
    }
  });
  entries.forEach(element => {
    if ('choices' in jessy(element, baseObj)) {
      choicesMap.set(element + '.choices', true);
    }
  });
  let checkpoints = [
    ...Array.from(schemaMap.keys()),
    Array.from(choicesMap.keys()),
    ...allKeys
  ];
  // now, based on the type of checkpoint, call it's function on it
};

export default runIsolatedChecksOnEndPoints;
