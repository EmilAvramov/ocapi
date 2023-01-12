import { ContextChildren, IAuthContext } from '@context-types';
import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';

const AuthContext = createContext<IAuthContext | null>(null);

export const UseAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<ContextChildren> = ({ children }) => {
    const { token, tokenType, customerID, authError, changeTokenType } = useAuth()

	return (
		<AuthContext.Provider value={{ token, tokenType, customerID, authError, changeTokenType }}>
			{children}
		</AuthContext.Provider>
	);
};