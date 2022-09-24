

test_function () {
    echo $1 > ./Judge/tmp/$3.IN1
    echo $2 > ./Judge/tmp/$3.IN2

    diff -bBs ./Judge/tmp/$3.IN1 ./Judge/tmp/$3.IN2 > /dev/null
    error=$?
    if [ $error -eq 0 ]; then
        return 4; # Testcase Passed
    elif [ $error -eq 1 ]; then
        return 5; # Testcase Failed
    else
        return 6; # Internal Error
    fi   
}
