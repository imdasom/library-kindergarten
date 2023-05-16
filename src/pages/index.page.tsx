import Layout from '../components/Layout';

export default function Book() {
  return (
    <Layout>
      <div style={ContentContainer}>
        <div style={Buttons}>
          <a href={'/use'} style={UseButton}>
            대 출
          </a>
          <a href={'/return'} style={ReturnButton}>
            반 납
          </a>
        </div>
      </div>
    </Layout>
  );
}

const ContentContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '20px',
  flex: 1,
  height: '100%',
  padding: '50px 0 70px 0',
} as React.CSSProperties;

const Buttons = {
  display: 'grid',
  gridAutoFlow: 'row',
  gap: 30,
  gridTemplateRows: '1fr 1fr',
  height: '100%',
  width: '50vw',
};

const UseButton = {
  background: '#ee6d6d',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '7em',
  cursor: 'pointer',
  borderRadius: 50,
};

const ReturnButton = {
  background: '#6d94ff',
  color: 'white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '7em',
  cursor: 'pointer',
  borderRadius: 50,
};
