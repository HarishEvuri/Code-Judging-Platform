#!/bin/sh

SUCCESS=0
FAILURE=1


SRCPATH="./Judge/tmp/${1}"
EXECPATH="${SRCPATH}.out"

case "$SRCPATH" in
    *.c)
        if gcc $SRCPATH -lm -O3 -o $EXECPATH ; then
            chmod 555 $EXECPATH
            return $SUCCESS           
        fi
        ;;
    *.cpp)
        if g++ $SRCPATH -lm -O3 -o $EXECPATH ; then
            chmod 555 $EXECPATH
            return $SUCCESS           
        fi
        ;;
esac

return $FAILURE

