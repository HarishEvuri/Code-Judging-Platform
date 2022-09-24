

test_function () {
    echo $1 > ./Judge/tmp/$3.IN1
    echo $2 > ./Judge/tmp/$3.IN2

    diff -bBs ./Judge/tmp/$3.IN1 ./Judge/tmp/$3.IN2 > /dev/null
    error=$?
    if [ $error -eq 0 ]; then
        rm ./tmp/$3.IN1 ./tmp/$3.IN2
        return 4; # Testcase Passed
    elif [ $error -eq 1 ]; then
        rm ./tmp/$3.IN1 ./tmp/$3.IN2
        return 5; # Testcase Failed
    else
        rm ./tmp/$3.IN1 ./tmp/$3.IN2
        return 6; # Internal Error
    fi   
}
