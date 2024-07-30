import { useState, useCallback } from 'react';
import useIsMounted from './useIsMounted';

// custom hook para resolver o problema de:
// Can't perform a React state update on an unmounted component
export default function useSafeAsyncState(initialState) {
  const [state, setState] = useState(initialState);

  const isMounted = useIsMounted();

  const setSafeAsyncState = useCallback((data) => {
    if (isMounted()) {
      setState(data);
    }
  }, [isMounted]);

  return [state, setSafeAsyncState];
}
