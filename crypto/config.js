const crypto=require('cryto')
const bcrypt=require('bcrypt')

const secret = crypto.randomBytes(64).toString('hex');
const hashedSecret = bcrypt.hashSync(secret, 10);

export{secret,hashedSecret}
