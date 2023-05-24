import { PropsWithChildren } from 'react';
import { IoMenuSharp } from 'react-icons/io5';
import useModal from '@/components/Modal/useModal';
import Modal from '@/components/Modal/Modal';
import Menu from '@/components/Menu/Menu';

export default function PageLayout({ children }: PropsWithChildren) {
  const sideMenu = useModal();
  return (
    <div style={Container}>
      <div style={Header}>
        <div />
        <div style={TitleContainer}>
          <img src={'/logo.png'} width={100} height={100} />
          <div style={Title}>{'사랑의 도서관'}</div>
        </div>
        <IoMenuSharp size={30} onClick={() => sideMenu.onOpen()} />
      </div>
      <div style={Content}>{children}</div>
      {sideMenu.open && (
        <Modal onClose={sideMenu.onClose}>
          <Menu />
        </Modal>
      )}
    </div>
  );
}

const Container = {};

const TitleContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
};

const Title = {
  fontFamily: 'kids',
  fontSize: 60,
  fontWeight: 'bold',
  color: 'black',
};

const Header = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 40px',
  fontSize: 50,
  color: 'black',
  height: 140,
};

const Content = {
  height: 'calc(100vh - 200px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};
