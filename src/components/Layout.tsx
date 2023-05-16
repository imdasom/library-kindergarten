import { FiMoreHorizontal } from 'react-icons/fi';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div style={Container}>
      <div style={Header}>
        <div />
        <div style={TitleContainer}>
          <img src={'/logo.png'} width={100} height={100} />
          <div style={Title}>{'사랑의 도서관'}</div>
        </div>
        <FiMoreHorizontal />
      </div>
      <div style={Content}>{children}</div>
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
  fontSize: 80,
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
