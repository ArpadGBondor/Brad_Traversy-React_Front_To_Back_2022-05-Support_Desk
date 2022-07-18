import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset, errorReset } from '../features/tickets/ticketSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';
import TicketItem from '../components/TicketItem';

function Tickets() {
    const { tickets, isLoading, isSuccess, isError, message } = useSelector((state) => state.tickets);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError & message) {
            toast.error(message);
            dispatch(errorReset());
        }
    }, [isSuccess, dispatch, isError, message]);
    useEffect(() => {
        dispatch(getTickets());
        return () => {
            dispatch(reset());
        };
        // eslint-disable-next-line
    }, []);

    if (isLoading) return <Spinner />;
    if (isError) return <h3>Something went wrong.</h3>;
    return (
        <>
            <BackButton url="/" />
            <h1>Tickets</h1>
            <div className="tickets">
                <div className="ticket-headings">
                    <div>Date</div>
                    <div>Product</div>
                    <div>Status</div>
                    <div></div>
                </div>
                {tickets.map((ticket) => (
                    <TicketItem key={ticket._id} ticket={ticket} />
                ))}
            </div>
        </>
    );
}

export default Tickets;
