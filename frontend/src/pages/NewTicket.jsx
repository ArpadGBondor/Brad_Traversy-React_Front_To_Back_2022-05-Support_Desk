import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function NewTicket() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return <div>NewTicket</div>;
}

export default NewTicket;
