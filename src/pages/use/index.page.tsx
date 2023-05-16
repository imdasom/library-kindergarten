import { useCallback, useEffect, useState } from 'react';
import { Book, getBookByBarcode } from '../../services/BookService';
import { getUserByBarcode, User } from '../../services/UserService';
import Layout from '../../components/Layout';

let keybuffer = '';

export default function UseOrReturnPage() {
  const [step, setStep] = useState(1);
  const [book, setBook] = useState<Book>();
  const [user, setUser] = useState<User>();

  const handleKeyPress = useCallback(
    async (e: KeyboardEvent) => {
      if (e.keyCode === 13) {
        if (step === 1) {
          await handleBookBarcode(keybuffer);
        } else if (step === 2) {
          await handleUserBarcode(keybuffer);
        }
        keybuffer = '';
      } else {
        keybuffer += String.fromCharCode(e.keyCode);
      }
    },
    [step]
  );

  useEffect(() => {
    document.addEventListener('keypress', handleKeyPress);
    return () => document.removeEventListener('keypress', handleKeyPress);
  }, [handleKeyPress]);

  const handleBookBarcode = (barcode: string) => {
    return getBookByBarcode(barcode)
      .then((book) => {
        if (!book) return;
        if (book.inUse) {
          throw Error('이미 대출중인 책입니다');
        }
        setBook(book);
      })
      .then(() => {
        setStep((prev) => prev + 1);
      })
      .catch((error) => {
        alert(error.message);
        keybuffer = '';
      });
  };

  const handleUserBarcode = (barcode: string) => {
    return getUserByBarcode(barcode)
      .then((user) => {
        if (!user) return;
        setUser(user);
      })
      .then(() => {
        setStep((prev) => prev + 1);
      })
      .catch((error) => {
        alert(error.message);
        keybuffer = '';
      });
  };

  return (
    <Layout>
      <div style={Container}>
        <div style={ContentContainer}>
          {step === 1 && (
            <>
              <div style={ImageContainer}>
                <img
                  src={'/barcode-book-2.jpg'}
                  width={'100%'}
                  height={'100%'}
                />
              </div>
              <div style={ReadBarcodeText}>책 바코드를 찍어주세요</div>
            </>
          )}
          {step === 2 && (
            <>
              <div style={ImageContainer}>
                <img src={'/barcode-user.png'} width={'100%'} height={'100%'} />
              </div>
              <div style={ReadBarcodeText}>회원카드의 바코드를 찍어주세요</div>
            </>
          )}
          {step === 3 && (
            <>
              <div style={ImageContainer}>
                <img
                  src={'/barcode-success.png'}
                  width={'100%'}
                  height={'100%'}
                />
              </div>
              <div style={ReadBarcodeText}>대출이 완료되었어요</div>
            </>
          )}
        </div>
        <div style={InfoContainer}>
          <div>책정보</div>
          <div style={BarcodeWrapper}>
            <div style={Barcode}>
              {!!book && (
                <>
                  <div style={BarcodeText}>{book.barcode}</div>
                  <div>{`${book.title} / ${book.author}`}</div>
                </>
              )}
            </div>
          </div>
          <div>회원정보</div>
          <div style={BarcodeWrapper}>
            <div style={Barcode}>
              {!!user && (
                <>
                  <div style={BarcodeText}>{user.barcode}</div>
                  <div>{user.name}</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

const Container = {
  display: 'grid',
  gridAutoFlow: 'column',
  gridTemplateColumns: '1fr 600px',
  gap: '50px',
};

const ContentContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 30,
} as React.CSSProperties;

const ImageContainer = {
  width: 300,
  height: 300,
};

const ReadBarcodeText = {
  fontSize: 20,
};

const BarcodeWrapper = {
  border: 'none',
  borderRadius: 10,
  padding: 10,
  width: '100%',
  height: 100,
  fontSize: 20,
  background: '#f8f8f8',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  whiteSpace: 'pre-line',
} as React.CSSProperties;

const Barcode = {
  padding: '0 20px',
  lineHeight: '35px',
};

const InfoContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: 30,
} as React.CSSProperties;

const BarcodeText = {
  color: '#b1b1b1',
};
