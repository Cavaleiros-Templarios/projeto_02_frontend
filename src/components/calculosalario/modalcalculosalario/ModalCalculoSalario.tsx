import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import './ModalCalculoSalario.css'
import FormCalculoSalario from '../formcalculosalario/FormCalculoSalario';

interface ModalProps {
    id: string;
}

function ModalCalculoSalario({ id }: ModalProps) {
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Calcular salário
                    </button>
                }
                modal
            >
                <FormCalculoSalario id={id}/>
            </Popup>
        </>
    );
}

export default ModalCalculoSalario;