/* csc -out:debug/out.exe -optimize -recurse:*.cs */
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFirstProject
{
    class Program
    {
        private Unit unit;
        private string name;

        public string Name{
            set { name = "Свойство: " + value; }
            get { return this.name; }
        }

        static void Main(string[] args)
        {
            int outpurResult = 0;
            int one = 3;
            int two = 2;
            Program p = new Program();
            Calc(one, two, out outpurResult);
            Console.WriteLine("Работа параметра out: " + outpurResult);

            Sq(ref one);
            Console.WriteLine("Работы псевдоуказателя: " + one);

            p.Name = "John";
            Console.WriteLine("Работа свойства объекта: " + p.Name);
        }
        static void Calc(int a, int b, out int res) 
        {
            res = a + b;
        }
        static void Sq(ref int a, int s = 2)
        {
            a *= s;
        }
    }
}
