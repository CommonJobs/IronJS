using Microsoft.VisualStudio.TestTools.UnitTesting;
namespace Tests.Sputnik {
  [TestClass]
  public class Conformance_15_Native_ECMA_Script_Objects_15_8_The_Math_Object_15_8_2_Function_Properties_of_the_Math_Object_15_8_2_8_exp : BaseTest {
    [TestInitialize]
    public void Init() { SetSputnikDir(@"Conformance\15_Native_ECMA_Script_Objects\15.8_The_Math_Object\15.8.2_Function_Properties_of_the_Math_Object\15.8.2.8_exp"); }
    [TestMethod] public void S15_8_2_8_A1_js() { RunFile(@"S15.8.2.8_A1.js"); }
    [TestMethod] public void S15_8_2_8_A2_js() { RunFile(@"S15.8.2.8_A2.js"); }
    [TestMethod] public void S15_8_2_8_A3_js() { RunFile(@"S15.8.2.8_A3.js"); }
    [TestMethod] public void S15_8_2_8_A4_js() { RunFile(@"S15.8.2.8_A4.js"); }
    [TestMethod] public void S15_8_2_8_A5_js() { RunFile(@"S15.8.2.8_A5.js"); }
    [TestMethod] public void S15_8_2_8_A6_js() { RunFile(@"S15.8.2.8_A6.js"); }
  }
}