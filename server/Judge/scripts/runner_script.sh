#!/bin/sh

FILENAME=$1
shift

TIMELIMIT=$1
shift

MEMLIMIT=$1
shift

INPUT=$1
shift

CORRECTANSWER=$1

OUTPUT=$(echo $INPUT | ./Judge/runsolver -C $TIMELIMIT -W $TIMELIMIT -R $MEMLIMIT -V $MEMLIMIT -w /dev/null -v ./Judge/tmp/${FILENAME}.log  ./Judge/tmp/${FILENAME}.out)
echo $OUTPUT

. ./Judge/tmp/${FILENAME}.log
rm ./Judge/tmp/${FILENAME}.log

if [ $TIMEOUT = true ] ; then
    return 2;   # Timeout
elif [ $MEMOUT = true ] ; then
    return 3;   # MemOut
elif [ "$EXITSTATUS" = "0" ] ; then
    . ./Judge/scripts/default_test_script.sh
    test_function "$OUTPUT" "$CORRECTANSWER" $FILENAME
    return $?;
else
    return 7; # Runtime error
fi
