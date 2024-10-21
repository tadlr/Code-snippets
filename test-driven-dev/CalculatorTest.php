<?php

use PHPUnit\Framework\TestCase;

require_once 'Calculator.php';

class CalculatorTest extends TestCase {
  public function testAddition() {
    $calculator = new Calculator();
    $this->assertEquals(5, $calculator->add(2, 3));
  }

  public function testSubtraction() {
    $calculator = new Calculator();
    $this->assertEquals(4, $calculator->subtract(7, 3));
  }

  public function testMultiplication() {
    $calculator = new Calculator();
    $this->assertEquals(10, $calculator->multiply(2, 5));
  }

  public function testDivision() {
    $calculator = new Calculator();
    $this->assertEquals(2, $calculator->divide(10, 5));
  }

  public function testDivisionByZero() {
    $calculator = new Calculator();
    $this->expectException(DivisionByZeroError::class);
    $calculator->divide(10, 0);
  }
}
