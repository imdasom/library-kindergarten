import { useEffect, useState } from 'react';
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  User,
} from '@/services/UserService';
import AdminPageLayout from '@/components/AdminPageLayout/AdminPageLayout';
import styles from './index.module.scss';
import UserModal from '@/pages/users/components/UserModal';
import useModal from '@/components/Modal/useModal';
import Button from '@/components/Button/Button';

export default function UserListPage() {
  const [userList, setUserList] = useState<User[]>();
  const createModal = useModal();
  const updateModal = useModal();
  const [modalUser, setModalUser] = useState<User>();

  const handleGetUserList = () => {
    getUsers().then((response) => {
      if (!response) return;
      setUserList(response);
    });
  };

  useEffect(() => {
    handleGetUserList();
  }, []);

  const openUpdateModal = (user: User) => {
    updateModal.onOpen();
    setModalUser(user);
  };

  const handleSubmitCreate = (user: User) => {
    createUser(user)
      .then(() => {
        alert('등록되었습니다');
        createModal.onClose();
        setModalUser(undefined);
        return handleGetUserList();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSubmitUpdate = (user: User) => {
    updateUser(user)
      .then(() => {
        alert('수정되었습니다');
        updateModal.onClose();
        setModalUser(undefined);
        return handleGetUserList();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleDelete = (user: User) => {
    deleteUser(user)
      .then(() => {
        alert('삭제되었습니다');
        return handleGetUserList();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <AdminPageLayout>
      <div className={styles.container}>
        <div className={styles.actionButtons}>
          <div>
            총 <strong>{userList?.length || 0}</strong>개
          </div>
          <Button onClick={createModal.onOpen}>추가</Button>
        </div>
        <div className={styles.listContainer}>
          <div className={styles.itemContainer}>
            <div>아이디</div>
            <div>바코드</div>
            <div>이름</div>
            <div>권한</div>
            <div>등록일</div>
            <div>수정일</div>
            <div></div>
          </div>
          {userList?.map((user, i) => {
            return (
              <div
                key={i}
                className={styles.itemContainer}
                onClick={() => openUpdateModal(user)}
              >
                <div>{user.id}</div>
                <div>{user.barcode}</div>
                <div>{user.name}</div>
                <div>{user.role === 'ADMIN' ? '관리자' : '일반'}</div>
                <div>{user.createdAt.format('YYYY-MM-DD')}</div>
                <div>{user.updatedAt.format('YYYY-MM-DD')}</div>
                <div>
                  <Button
                    buttonStyle={'danger'}
                    buttonSize={'S'}
                    onClick={(event) => {
                      event.stopPropagation();
                      handleDelete(user);
                    }}
                  >
                    삭제
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {createModal.open && (
        <UserModal
          actionType={'NEW'}
          onClose={() => {
            createModal.onClose();
            setModalUser(undefined);
          }}
          onSubmit={handleSubmitCreate}
          user={modalUser}
        />
      )}
      {updateModal.open && (
        <UserModal
          actionType={'EDIT'}
          onClose={() => {
            updateModal.onClose();
            setModalUser(undefined);
          }}
          onSubmit={handleSubmitUpdate}
          user={modalUser}
        />
      )}
    </AdminPageLayout>
  );
}
