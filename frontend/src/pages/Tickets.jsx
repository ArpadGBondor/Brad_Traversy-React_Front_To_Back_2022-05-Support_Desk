import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function Tickets() {
    const { tickets, isLoading, isSuccess } = useSelector((state) => state.tickets);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
        }
    }, [isSuccess, dispatch]);
    useEffect(() => {
        dispatch(getTickets());
        console.log('asdASasdda');
    }, [dispatch]);

    if (isLoading) return <Spinner />;
    return <div>Tickets</div>;
}

export default Tickets;
