import React from 'react';
import { Modal } from '../';
import { Props } from '../Modal/Modal';

const Ranking: React.FC<Props> = ({ isActive, onClose }: Props) => {
    return (
        <Modal isActive={isActive} onClose={onClose}>
            show rankings
        </Modal>
    );
};

export default Ranking;
