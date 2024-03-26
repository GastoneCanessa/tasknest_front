import { useAtom } from 'jotai';
import { currentUser } from '../../App';

export default function NewComment() {

    const [user, setUser] = useAtom(currentUser);
}