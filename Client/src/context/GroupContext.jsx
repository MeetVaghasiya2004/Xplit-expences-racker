import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const GroupContext = createContext();

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groupTransactions, setGroupTransactions] = useState([]);
    const { socket } = useAuth();

    useEffect(() => {
        loadGroups();
        
        if (socket) {
            socket.on('group-created', handleGroupCreated);
            socket.on('group-transaction-added', handleGroupTransactionAdded);
            
            return () => {
                socket.off('group-created');
                socket.off('group-transaction-added');
            };
        }
    }, [socket]);

    const loadGroups = async () => {
        try {
            const response = await axios.get('/api/v1/transaction/groups');
            setGroups(response.data.data);
        } catch (error) {
            console.error('Failed to load groups:', error);
            toast.error('Failed to load groups');
        }
    };

    const createGroup = async (name, memberEmails) => {
        try {
            const response = await axios.post('/api/v1/transaction/groups', {
                name,
                memberEmails
            });
            setGroups(prev => [...prev, response.data.data]);
            toast.success('Group created successfully');
            return response.data.data;
        } catch (error) {
            console.error('Failed to create group:', error);
            toast.error(error.response?.data?.message || 'Failed to create group');
            throw error;
        }
    };

    const loadGroupTransactions = async (groupId) => {
        try {
            const response = await axios.get(`/api/v1/transaction/groups/${groupId}/transactions`);
            setGroupTransactions(response.data.data.transactions);
            return response.data.data;
        } catch (error) {
            console.error('Failed to load group transactions:', error);
            toast.error('Failed to load group transactions');
            throw error;
        }
    };

    const addGroupTransaction = async (groupId, amount, note, splitType = 'equal') => {
        try {
            const response = await axios.post('/api/v1/transaction/groups/transactions', {
                groupId,
                amount,
                note,
                splitType
            });
            setGroupTransactions(prev => [...prev, response.data.data]);
            toast.success('Transaction added successfully');
            return response.data.data;
        } catch (error) {
            console.error('Failed to add transaction:', error);
            toast.error(error.response?.data?.message || 'Failed to add transaction');
            throw error;
        }
    };

    const handleGroupCreated = (group) => {
        setGroups(prev => [...prev, group]);
        toast.success(`Added to new group: ${group.name}`);
    };

    const handleGroupTransactionAdded = ({ groupId, transaction }) => {
        if (selectedGroup?._id === groupId) {
            setGroupTransactions(prev => [...prev, transaction]);
            toast.success('New group transaction received');
        }
    };

    const value = {
        groups,
        selectedGroup,
        setSelectedGroup,
        groupTransactions,
        createGroup,
        loadGroupTransactions,
        addGroupTransaction
    };

    return (
        <GroupContext.Provider value={value}>
            {children}
        </GroupContext.Provider>
    );
}; 