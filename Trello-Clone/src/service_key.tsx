const PRIVATE_KEY_ID = import.meta.env.VITE_PRIVATE_KEY_ID;
const PRIVATE_KEY = import.meta.env.VITE_PRIVATE_KEY;

const serviceAccount = {
    "type": "service_account",
    "project_id": "trello-clone-97722",
    "private_key_id": PRIVATE_KEY_ID,
    "private_key": PRIVATE_KEY,
    "client_email": "firebase-adminsdk-nyr29@trello-clone-97722.iam.gserviceaccount.com",
    "client_id": "102017581183225531893",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-nyr29%40trello-clone-97722.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
}

export default serviceAccount