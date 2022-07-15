import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowCircleLeft } from 'react-icons/fa';

function BackButton({ url }) {
    return (
        <Link className="btn btn-reverse btn-back" to={url}>
            <FaArrowCircleLeft /> Back
        </Link>
    );
}

export default BackButton;
