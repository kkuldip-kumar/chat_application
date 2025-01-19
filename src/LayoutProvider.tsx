import { FC, useState, createContext, useContext, useMemo, useRef, useEffect } from 'react'
import {
  ID,
  groupingOnSelectAll,
  WithChildren,
} from '@/utils'
import { useMediaQuery } from 'react-responsive';
import { useLocation } from 'react-router-dom';
type LayoutViewContextProps = {
  open: boolean;
  isTabletMid: boolean;
  Nav_animation: object
  setOpen: (value: boolean) => void;
};

const initialValues: LayoutViewContextProps = {
  open: true,
  isTabletMid: false,
  Nav_animation: {},
  setOpen: () => { }, // Provide a default no-op function
};
const LayoutViewContext = createContext<LayoutViewContextProps>(initialValues)

const LayoutProvider: FC<WithChildren> = ({ children }) => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
  const [open, setOpen] = useState(isTabletMid ? false : true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);

  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);
  const Nav_animation = isTabletMid
    ? {
      open: {
        x: 0,
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        x: -250,
        width: 0,
        transition: {
          damping: 40,
          delay: 0.15,
        },
      },
    }
    : {
      open: {
        width: "16rem",
        transition: {
          damping: 40,
        },
      },
      closed: {
        width: "4rem",
        transition: {
          damping: 40,
        },
      },
    };
  return (
    <LayoutViewContext.Provider
      value={{
        open,
        isTabletMid,
        Nav_animation,
        setOpen
      }}
    >
      {children}
    </LayoutViewContext.Provider>
  )
}

const useLayoutView = () => useContext(LayoutViewContext)

export { LayoutProvider, useLayoutView }
