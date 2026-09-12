(() => {
  const form = document.querySelector('[data-calculator]');
  if (!form) return;

  const money = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  });
  const fields = {
    employees: form.querySelector('#employees'),
    revenue: form.querySelector('#revenue'),
    hours: form.querySelector('#hours'),
    rto: form.querySelector('#rto'),
    rpo: form.querySelector('#rpo'),
    criticality: form.querySelector('#criticality')
  };
  const output = {
    total: document.querySelector('[data-total]'),
    revenue: document.querySelector('[data-revenue-loss]'),
    labor: document.querySelector('[data-labor-loss]'),
    response: document.querySelector('[data-response-cost]'),
    tier: document.querySelector('[data-tier]'),
    tierCopy: document.querySelector('[data-tier-copy]'),
    hours: document.querySelector('[data-hours-output]')
  };
  const tiers = [
    { max: 25000, name: 'Essential Defense', copy: 'Prioritize verified backup, identity hardening and a documented incident contact path.' },
    { max: 100000, name: 'Resilience Control', copy: 'Add managed detection, defined containment roles and scheduled recovery validation.' },
    { max: Infinity, name: 'Recovery Assurance', copy: 'Use tightly engineered recovery targets, immutable copies and rehearsed incident command.' }
  ];

  function calculate() {
    const employees = Math.max(1, Number(fields.employees.value) || 1);
    const hourlyRevenue = Math.max(0, Number(fields.revenue.value) || 0);
    const hours = Math.max(1, Number(fields.hours.value) || 1);
    const rto = Number(fields.rto.value);
    const rpo = Number(fields.rpo.value);
    const criticality = Number(fields.criticality.value);
    const revenueLoss = hourlyRevenue * hours * criticality;
    const idleLabor = employees * 46 * hours * Math.min(1, criticality * 0.78);
    const responseBase = 7800 + employees * 105;
    const recoveryPressure = (rto <= 4 ? 1.3 : 1) * (rpo <= 4 ? 1.2 : 1);
    const responseCost = responseBase * recoveryPressure;
    const total = revenueLoss + idleLabor + responseCost;
    const tier = tiers.find((item) => total <= item.max) || tiers[2];

    output.total.textContent = money.format(total);
    output.revenue.textContent = money.format(revenueLoss);
    output.labor.textContent = money.format(idleLabor);
    output.response.textContent = money.format(responseCost);
    output.tier.textContent = tier.name;
    output.tierCopy.textContent = tier.copy;
    output.hours.textContent = String(hours) + (hours === 1 ? ' hour' : ' hours');
  }

  form.addEventListener('input', calculate);
  form.addEventListener('change', calculate);
  calculate();
})();
