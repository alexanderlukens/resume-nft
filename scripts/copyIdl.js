const fs = require('fs');
const idl = require('../target/idl/resume_nft.json');

fs.writeFileSync('../app/src/idl.json', JSON.stringify(idl));