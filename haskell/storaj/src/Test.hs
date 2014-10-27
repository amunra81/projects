module Test where
import Language.Java.Parser

s = parser compilationUnit "import java.util.*; @sds public class MyClass {}"
