
import { AuthContext, AuthProvider } from './auth';

import AuthServices from './auth/hooks';

const Store = { AuthContext };
const Provider = { AuthProvider };

export default {
    ...Store,
    ...Provider,
    AuthServices
};
