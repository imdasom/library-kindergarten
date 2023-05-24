import { useEffect, useState } from 'react';
import { History, getHistories } from '@/services/HistoryService';
import AdminPageLayout from '@/components/AdminPageLayout/AdminPageLayout';
import styles from './index.module.scss';

export default function HistoryListPage() {
  const [historyList, setHistoryList] = useState<History[]>();

  const handleGetHistoryList = () => {
    getHistories().then((response) => {
      if (!response) return;
      setHistoryList(response);
    });
  };

  useEffect(() => {
    handleGetHistoryList();
  }, []);

  return (
    <AdminPageLayout>
      <div className={styles.container}>
        <div className={styles.actionButtons}>
          <div className={styles.leftActionItems}>
            <div>
              총 <strong>{historyList?.length || 0}</strong>개
            </div>
          </div>
        </div>
        <div className={styles.listContainer}>
          <div className={styles.itemContainer}>
            <div>NO</div>
            <div>상태</div>
            <div>대여한 사람</div>
            <div>대여한 책</div>
            <div>대여일</div>
            <div>기한</div>
            <div>반납일</div>
          </div>
          {historyList?.map((history, i) => {
            return (
              <div key={i} className={styles.itemContainer} alt={history.id}>
                <div>{historyList?.length - i}</div>
                <div>
                  <div
                    className={
                      !!history.returnAt
                        ? styles.statusReturn
                        : styles.statusInUse
                    }
                  >
                    {!!history.returnAt ? '반납완료' : '대여중'}
                  </div>
                </div>
                <div>{history.user.name}</div>
                <div>{history.book.title}</div>
                <div>{history.createdAt.format('YYYY-MM-DD HH:mm')}</div>
                <div>{history.dueAt.format('YYYY-MM-DD HH:mm')}</div>
                <div>{history.returnAt?.format('YYYY-MM-DD HH:mm')}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminPageLayout>
  );
}
