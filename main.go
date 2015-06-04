package main

import (
	// "flag"
	"fmt"
	"regexp"
	// "strconv"
	// "strings"
)

type operator string

const (
	MUL = "*"
	DIV = "/"
	ADD = "+"
	SUB = "-"
)

type polynome struct {
	term int
	int
}

func isOperator(s string) bool {
	if s == MUL || s == DIV || s == ADD || s == SUB {
		return true
	}
	return false
}

func errorFormat() {
	fmt.Println("Wrong input format")
}

// func checkArgs() {
// 	flag.Parse()
// 	if flag.NArg() >= 1 {
// 		eq := strings.Split(flag.Arg(0), " ")
// 		fmt.Println(eq)
// 		for k, v := range eq {
// 			if v == MUL {
// 				// THIS IS A TERM
// 				if k-1 < 0 { // ERROR CASE WHERE THE EQUATION BEGIN BY A MUL OPERATOR
// 					errorFormat()
// 					return
// 				}
// 				_, err := strconv.Atoi(eq[k-1])
// 				if err == nil {
// 					fmt.Println("OK")
// 				} else {
// 					fmt.Println("Wrong input format")
// 				}
// 			}

// 			num, err := strconv.Atoi(v)
// 			if err == nil {
// 				fmt.Println(num)
// 			} else {
// 				fmt.Println(err)
// 			}
// 		}
// 	} else {
// 		fmt.Println("No argument")
// 	}
// }

func checkArgs() {

	r, _ := regexp.Compile("(.*) =")
	String("5 * X^0 + 4 * X^1 - 9.3 * X^2 = 1 * X^0"))
}

func main() {
	checkArgs()
}
