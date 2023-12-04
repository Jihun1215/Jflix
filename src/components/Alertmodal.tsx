import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

import { useRecoilState, useRecoilValue } from 'recoil';
import { AlertModalState, AlertTextState } from 'state/atoms';

export const Alertmodal = () => {
  const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  };

  const modalVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: '-50%', transition: { duration: 0.1 } },
  };

  const [alertmodal, setAlertmodla] = useRecoilState(AlertModalState);
  const alertText = useRecoilValue(AlertTextState);

  useEffect(() => {
    if (alertmodal) {
      setAlertmodla(alertmodal);
      const timeoutId = setTimeout(() => {
        setAlertmodla(false);
      }, 1500);
      return () => clearTimeout(timeoutId);
    }
  }, [alertmodal, setAlertmodla]);

  //   console.log

  return (
    <AnimatePresence>
      {alertmodal && (
        <Container variants={backdropVariants} initial="hidden" animate="visible" exit="hidden">
          <ModalCard variants={modalVariants} initial="hidden" animate="visible" exit="hidden" onClick={(e) => e.stopPropagation()}>
            {alertText}
          </ModalCard>
        </Container>
      )}
    </AnimatePresence>
  );
};

const Container = styled(motion.div)`
  ${({ theme }) => theme.FlexRow};
  justify-content: center;
  position: fixed;
  z-index: 99999;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(1px);
`;

const ModalCard = styled(motion.div)`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.yellow};
  top: 10%;
  border-radius: 8px;
  width: 300px;
  height: 65px;
  ${({ theme }) => theme.BoxCenter};
  font-size: 20px;
  font-weight: 600;
`;
