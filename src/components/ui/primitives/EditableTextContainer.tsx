import { Input } from '@/components/ui/primitives/Input';
import { cn } from '@/utils/helpers';
import { useEffect, useRef, useState } from 'react';

export function EditableTextContainer({
  doubleClick,
  children,
  className,
  labelStyles,
  singleClick = () => {},
  ...rest
}: any) {
  const [edit, setEdit] = useState(false);

  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    let singleClickTimer: any;
    if (clicks === 1) {
      singleClickTimer = setTimeout(function () {
        setClicks(0);
      }, 250);
      if (!doubleClick) handleEditMode();
      singleClick();
    } else if (clicks === 2) {
      if (doubleClick) handleEditMode();
      setClicks(0);
    }
    return () => clearTimeout(singleClickTimer);
  }, [clicks]);

  function handleClick(e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'click') {
      setClicks(clicks + 1);
    } else if (e.type === 'contextmenu') {
      console.log('Right click');
    }
  }

  function handleEditMode() {
    setEdit(true);
  }

  function handleBlur(e: any) {
    setEdit(false);
    // setInputValue(e.target.value);
  }

  function handleEnter(e: any) {
    if (e.code === 'Enter' || e.charCode === 13 || e.which === 13) {
      setEdit(false);
      // setInputValue('');
    }
  }

  if (edit) {
    // edit mode
    return (
      <TextField
        autoFocus
        onBlurCapture={handleBlur}
        onKeyPress={handleEnter}
        className={className}
        {...rest}
      />
    );
  } else {
    // view mode
    return (
      <button
        onClickCapture={handleClick}
        {...rest}
        className={cn(
          'p-1 border-l border-transparent overflow-hidden overflow-ellipsis flex-1 w-full h-8 text-sm text-left',
          labelStyles
        )}
      >
        {children}
      </button>
    );
  }
}

function TextField({ autoFocus = false, className, ...props }: any) {
  const inputRef: any = useRef(null);

  useEffect(() => {
    if (inputRef.current && autoFocus) inputRef.current?.focus();
  }, [inputRef]);

  return (
    <Input
      ref={inputRef}
      type="text"
      className={cn(
        `focus-visible:ring-0 focus:ring-0
          p-0 ring-0 focus:ring-offset-0 
          focus-visible:ring-offset-0 focus:no-underline h-9 px-1`,
        className
      )}
      {...props}
    />
  );
}
