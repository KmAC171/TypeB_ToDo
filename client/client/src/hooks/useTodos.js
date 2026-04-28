import { useState, useCallback, useEffect } from "react";
import * as api from "../api/todos";

export function useTodos() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const load = useCallback(async () => {
        try{
            setLoading(true);
            const { data } = await api.fetchTodos();
            setTodos(data);
            setError(null);

        } catch {
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const add = async (payload) => {
        const { data } = await api.createTodo(payload);
        setTodos(prev => [data, ...prev]);
    };

    const edit = async (id, payload) => {
        const { data } = await api.updateTodo(id, payload);
        setTodos(prev => prev.map(t => t._id === id ? data : t));
    };

    
}