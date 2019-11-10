const cleanFalsyProps = obj => 
    Object.keys(obj).reduce((prev, curr) => obj[curr] 
        ? {...prev, [curr]: obj[curr]}
        : prev
    , {})

export {cleanFalsyProps}